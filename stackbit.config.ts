import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname, // Asegúrate de que sea la ruta raíz correcta
      contentDirs: ["src/blog", "src/projects", "src/tags"], // Cambié content por src si tus carpetas están allí
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "src/pages/{slug}.json",
          fields: [{ name: "title", type: "string", required: true }]
        },
        {
          name: "BlogPost", // Modelo para los posts del blog
          type: "blog",
          urlPath: "/blog/{slug}",
          filePath: "src/blog/{slug}.json", // Asegúrate de que esté en la carpeta correcta
          fields: [
            { name: "title", type: "string", required: true },
            { name: "content", type: "text", required: true }
          ]
        },
        {
          name: "Project", // Modelo para proyectos
          type: "project",
          urlPath: "/projects/{slug}",
          filePath: "src/projects/{slug}.json", // Asegúrate de que esté en la carpeta correcta
          fields: [
            { name: "title", type: "string", required: true },
            { name: "description", type: "text", required: true }
          ]
        }
      ]
    })
  ]
});
