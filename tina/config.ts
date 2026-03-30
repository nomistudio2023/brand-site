import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH ?? 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'photos',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'content/blog',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
            ui: { dateFormat: 'YYYY-MM-DD' },
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
