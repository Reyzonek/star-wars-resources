import "express-async-errors";
import { createContainer } from "./container";
import { SwapiService } from "./shared/swapi/swapi-service";

(async () => {
  const container = await createContainer();
  process.on("uncaughtException", (err) => {
    container.cradle.logger.error(`Uncaught: ${err.toString()}`, err);
    process.exit(1);
  });

  process.on("unhandledRejection", (err: any) => {
    if (err) {
      container.cradle.logger.error(`Unhandled: ${err.toString()}`, err);
    }
    process.exit(1);
  });

  const { server, port } = container.cradle;
  server.listen(port);
  container.cradle.logger.info(`listening on port: ${port}`);

  const swapiService: SwapiService = container.resolve("swapiService");
  await swapiService.sheduleGetAndSaveSwapiResources();
})();
