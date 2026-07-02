FROM ghcr.io/berriai/litellm:main-latest

COPY litellm_config.yaml /app/config.yaml

EXPOSE 10000

CMD ["--config", "/app/config.yaml", "--port", "10000"]
