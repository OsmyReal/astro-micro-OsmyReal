import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname, // Ruta raíz de tu proyecto
      contentDirs: ["src/content/blog", "src/content/projects"],  // Las carpetas donde está el contenido
      models: [
        {
          name: "Blog",
          type: "page",  // El tipo de contenido es 'page'
          urlPath: "/blog/{slug}",  // Las páginas del blog tendrán URLs como /blog/{slug}
          filePath: "src/content/blog/{slug}.md",  // Define la ruta a los archivos de blog Markdown
          fields: [{ name: "title", type: "string", required: true }]  // Definir el título como campo requerido
        },
        {
          name: "Project",
          type: "page",  // El tipo de contenido es 'page'
          urlPath: "/projects/{slug}",  // Las páginas de los proyectos tendrán URLs como /projects/{slug}
          filePath: "src/content/projects/{slug}.md",  // Define la ruta a los archivos de proyectos Markdown
          fields: [{ name: "title", type: "string", required: true }]  // Definir el título como campo requerido
        }
      ]
    })
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page");

    return documents
      .filter((d) => pageModels.some(m => m.name === d.modelName))
      .map((document) => {
        const urlModel = document.modelName === "Blog" ? 'blog' : 'project';

        return {
          stableId: document.id,
          urlPath: `/${urlModel}/${document.id}`,  // URL para blog y proyectos
          document,
          isHomePage: false,
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  }
});
