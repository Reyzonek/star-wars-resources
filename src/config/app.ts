import { Joi } from "celebrate";
import { pipeline } from "ts-pipe-compose";

export interface AppConfig {
  appName: string;
  port: string;
  env: string;
  swapiBaseUrl: string;
  getSwapiResourceScheduleTime: string;
  minCustomPlanetId: string;
}

const loadConfig = (env: any): AppConfig => ({
  appName: env.APP_NAME ?? "boilerplate_api",
  port: env.PORT ?? "1337",
  env: env.STAGE,
  swapiBaseUrl: env.SWAPI_BASE_URL,
  getSwapiResourceScheduleTime: env.GET_SWAPI_RESOURCE_SCHEDULE_TIME,
  minCustomPlanetId: env.MIN_CUSTOM_PLANET_ID,
});

const validateConfig = (config: AppConfig) => {
  const schema = Joi.object<AppConfig>().keys({
    appName: Joi.string().required(),
    port: Joi.string().required(),
    env: Joi.string().required(),
    swapiBaseUrl: Joi.string().required(),
    getSwapiResourceScheduleTime: Joi.string().required(),
    minCustomPlanetId: Joi.string().required(),
  });
  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return value;
};

export const appConfigFactory = pipeline(loadConfig, validateConfig);
