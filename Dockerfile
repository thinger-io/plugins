FROM squidfunk/mkdocs-material

RUN \
  pip install mkdocs-git-revision-date-localized-plugin \
  pip install mkdocs-monorepo-plugin \
  pip install mkdocs-rss-plugin \
  pip install "mkdocs-material[imaging]"
