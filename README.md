# Chroma DB LangChain Example

## Pre-requisites

- Chroma server
- Node 18+

### Chroma Setup

Install and Run Chroma: https://medium.com/@amikostech/running-chromadb-part-1-local-server-2c61cb1c9f2c

Import sample data in Chroma with [Chroma Data Pipes](https://datapipes.chromadb.dev/):

```bash
 cdp ds-get "hf://KShivendu/dbpedia-entities-openai-1M" \
  --doc-feature text \
  --id-feature _id \
  --embed-feature openai \
  --meta-features title | \
  cdp import "http://localhost:8000/my_collection" --create --upsert
```

## Install

```bash
npm install
```

## Run

> Note: Make sure to export your OpenAI API key or set it in the `.env` file. The env var should
> be `OPENAI_API_KEY=sk-XXXXX`

```bash
npm run app
```
