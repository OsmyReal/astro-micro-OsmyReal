import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],  // Aquí indicas la carpeta donde está el contenido
      models: [
        {
          name: "Page",  // Nombre del modelo
          type: "page",  // Tipo de contenido
          urlPath: "/{slug}",  // Define la URL para cada página
          filePath: "content/pages/{slug}.json",  // Ruta a los archivos de contenido
          fields: [{ name: "title", type: "string", required: true }]  // Campos requeridos
        }
      ]
    })
  ],
  siteMap: ({ documents, models }) => {
    // Filtra solo los modelos de tipo "page"
    const pageModels = models.filter((m) => m.type === "page");

    return documents
      .filter((d) => pageModels.some(m => m.name === d.modelName)) // Filtra los documentos tipo página
      .map((document) => {
        const urlModel = document.modelName === "Page" ? 'page' : null;

        return {
          stableId: document.id,
          urlPath: `/${urlModel}/${document.id}`,  // Define la URL de cada página
          document,
          isHomePage: false,
        };
      })
      .filter(Boolean) as SiteMapEntry[];
  }
});
