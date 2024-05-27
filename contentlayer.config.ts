import {
  defineDocumentType,
  makeSource,
  ComputedFields,
} from "contentlayer/source-files"; // eslint-disable-line
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import codeTitle from "remark-code-titles";
import remarkMath from "remark-math";

const getSlug = (doc: any) => doc._raw.sourceFileName.replace(/\.mdx$/, "");

const postComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlug(doc),
  }
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    updatedAt: { type: "string", required: false },
    tags: { type: "json", required: false },
    image: { type: "string", required: false }
  },
  computedFields: postComputedFields,
}));

const projectComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlug(doc),
  },
};

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `project/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    time: { type: "string", required: true },
    url: { type: "string", required: false },
    awards: { type: "json", required: false },
  },
  computedFields: projectComputedFields,
}));

const publicationComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => getSlug(doc),
  },
};

export const Publication = defineDocumentType(() => ({
  name: "Publication",
  filePathPattern: `publication/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    journal: { type: "string", required: true },
    authors: { type: "json", required: true },
    url: { type: "string", required: false },
    forthcoming: { type: "boolean", required: false },
    tags: { type: "json", required: false },
    image: { type: "string", required: false },
    awards: { type: "json", required: false }
  },
  computedFields: publicationComputedFields,
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Project, Publication],
  mdx: {
    rehypePlugins: [rehypePrism, rehypeKatex],
    remarkPlugins: [
      codeTitle, remarkMath
    ],
  },
});
