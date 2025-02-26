import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"], // Aquí indicas la carpeta donde está el contenido
      models: [
        {
          name: "Page", // Modelo para las páginas estándar
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [{ name: "title", type: "string", required: true }]
        },
        {
          name: "BlogPost", // Modelo para las entradas del blog
          type: "blog", // Asume que es tipo "blog" o cualquier otro tipo
          urlPath: "/blog/{slug}",
          filePath: "content/blog/{slug}.json", // Ajusta la ruta según donde estén los posts
          fields: [
            { name: "title", type: "string", required: true },
            { name: "content", type: "text", required: true },
            // Añade más campos según lo que necesites
          ]
        },
        {
          name: "Project", // Modelo para proyectos
          type: "project", // Similar a blog pero para proyectos
          urlPath: "/projects/{slug}",
          filePath: "content/projects/{slug}.json", // Ajusta según la estructura de tu contenido
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "text", required: true },
            // Añade más campos aquí
          ]
        }
      ]
    })
  ]
});
