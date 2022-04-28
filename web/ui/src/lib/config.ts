import { readFileSync } from "fs"
import YAML from "yaml"


export const getConfig = (): Configuration => {
  const fileContent = readFileSync("../../stud42.config.yaml", "utf8")
  return YAML.parse(fileContent) as Configuration
}