import axios, { AxiosRequestHeaders } from "axios"
import { mutate } from "swr"
import * as Types from "./types"

const CONTENT_TYPE_JSON: AxiosRequestHeaders = {
  "Content-Type": "application/json",
}

export const provisioners: Types.Provisioner[] = [
  {
    id: "terraform",
    name: "Terraform",
  },
  {
    id: "cdr-basic",
    name: "Basic",
  },
]

export namespace Project {
  export const create = async (request: Types.CreateProjectRequest): Promise<Types.Project> => {
    const response = await fetch(`/api/v2/projects/${request.organizationId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    const body = await response.json()
    await mutate("/api/v2/projects")
    if (!response.ok) {
      throw new Error(body.message)
    }

    return body
  }
}

export namespace Workspace {
  export const create = async (request: Types.CreateWorkspaceRequest): Promise<Types.Workspace> => {
    const response = await fetch(`/api/v2/users/me/workspaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    const body = await response.json()
    if (!response.ok) {
      throw new Error(body.message)
    }

    // Let SWR know that both the /api/v2/workspaces/* and /api/v2/projects/*
    // endpoints will need to fetch new data.
    const mutateWorkspacesPromise = mutate("/api/v2/workspaces")
    const mutateProjectsPromise = mutate("/api/v2/projects")
    await Promise.all([mutateWorkspacesPromise, mutateProjectsPromise])

    return body
  }
}

export const login = async (email: string, password: string): Promise<Types.LoginResponse> => {
  const payload = JSON.stringify({
    email,
    password,
  })

  const response = await axios.post<Types.LoginResponse>("/api/v2/users/login", payload, {
    headers: { ...CONTENT_TYPE_JSON },
  })

  return response.data
}

export const logout = async (): Promise<void> => {
  await axios.post("/api/v2/users/logout")
}

export const getUser = async (): Promise<Types.UserResponse> => {
  const response = await axios.get<Types.UserResponse>("/api/v2/users/me")
  return response.data
}

export const getApiKey = async (): Promise<Types.APIKeyResponse> => {
  const response = await axios.post<Types.APIKeyResponse>("/api/v2/users/me/keys")
  return response.data
}