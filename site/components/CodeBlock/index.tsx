import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { MONOSPACE_FONT_FAMILY } from "../../theme/constants"

export interface CodeBlockProps {
  lines: string[]
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ lines }) => {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      {lines.map((line, idx) => (
        <div className={styles.line} key={idx}>
          {line}
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 156,
    background: theme.palette.background.default,
    color: theme.palette.codeBlock.contrastText,
    fontFamily: MONOSPACE_FONT_FAMILY,
    fontSize: 13,
    wordBreak: "break-all",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  line: {
    whiteSpace: "pre-wrap",
  },
}))
