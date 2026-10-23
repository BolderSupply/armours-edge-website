import type { SchemaTypeDefinition } from "sanity";
import { projectType } from "./project";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [projectType, siteSettingsType];
