import { makeStyles } from "@material-ui/core/styles"
import { Stack } from "../Stack/Stack"

export interface PageHeaderProps {
  actions?: JSX.Element
}

export const PageHeader: React.FC<PageHeaderProps> = ({ children, actions }) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <hgroup>{children}</hgroup>
      <Stack direction="row" className={styles.actions}>
        {actions}
      </Stack>
    </div>
  )
}

export const PageHeaderTitle: React.FC = ({ children }) => {
  const styles = useStyles()

  return <h1 className={styles.title}>{children}</h1>
}

export const PageHeaderSubtitle: React.FC = ({ children }) => {
  const styles = useStyles()

  return <h2 className={styles.subtitle}>{children}</h2>
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(5),
  },

  title: {
    fontSize: theme.spacing(4),
    fontWeight: 400,
    margin: 0,
    display: "flex",
    alignItems: "center",
    lineHeight: "140%",
  },

  subtitle: {
    fontSize: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    fontWeight: 400,
    display: "block",
    margin: 0,
    marginTop: theme.spacing(1),
  },

  actions: {
    marginLeft: "auto",
  },
}))