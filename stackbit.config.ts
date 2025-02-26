export default {
  contentSources: [
    new GitContentSource({
      path: 'path-to-your-content-directory',
      branch: 'main',
      models: {
        page: {
          type: 'page',
          fields: {
            title: {
              type: 'string',
            },
          },
          urlPath: '/:title',  // Personaliza la URL si es necesario
        },
      },
    }),
  ],
};
