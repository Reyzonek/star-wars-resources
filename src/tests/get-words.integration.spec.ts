import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { expect } from "chai";
import { MockFactory } from "./shared/mock-factory";
import "mocha";

describe("api/films/words integration", () => {
  let mockFactory: MockFactory;

  const characterNames = ["Rey", "Darrok Ren", "Poe Dameron"];

  before(async () => {
    mockFactory = new MockFactory(global.container);
    mockFactory.createFilms(3);
    mockFactory.createPeople(3);
    await mockFactory.insertIntoDatabase();

    await Promise.all(
      characterNames.map((name, id) => {
        return global.container.cradle.peopleRepository.update({ id }, { name });
      }),
    );
  });

  after(async () => {
    await mockFactory.clearDatabase();
  });

  it("should get unique word with most mentioned character details", async () => {
    const openingCrawls = [
      "The galaxy is in chaos.\n\nGeneral Poe Dameron leads a desperate mission to uncover the Order’s hidden base. Meanwhile, Rey, the last dark power.\n\n the...",
      "The Jedi are no more. Rey’s mysterious unbalanced and weak. In the shadows, a new Sith Lord, DARROK REN.\n\nWith a mighty armada under his command, Darrok Ren lays ...",
      "Emperor Palpatine. \n\nBut hope is not lost. MON MOTHMA secretly gathers dissidents to form the REBEL ALLIANCE. The galaxy’s in now darkness...",
    ];

    const expectedUniqueWords = {
      the: 8,
      galaxy: 2,
      is: 2,
      in: 3,
      chaos: 1,
      general: 1,
      poe: 1,
      dameron: 1,
      leads: 1,
      a: 3,
      desperate: 1,
      mission: 1,
      to: 2,
      uncover: 1,
      order: 1,
      hidden: 1,
      base: 1,
      meanwhile: 1,
      rey: 2,
      last: 1,
      jedi: 1,
      dark: 1,
      power: 1,
      are: 1,
      no: 1,
      more: 1,
      mysterious: 1,
      unbalanced: 1,
      and: 1,
      weak: 1,
      shadows: 1,
      new: 1,
      sith: 1,
      lord: 1,
      darrok: 2,
      ren: 2,
      with: 1,
      mighty: 1,
      armada: 1,
      under: 1,
      his: 1,
      command: 1,
      lays: 1,
      emperor: 1,
      palpatine: 1,
      but: 1,
      hope: 1,
      not: 1,
      lost: 1,
      mon: 1,
      mothma: 1,
      secretly: 1,
      gathers: 1,
      dissidents: 1,
      form: 1,
      rebel: 1,
      alliance: 1,
      now: 1,
      darkness: 1,
    };

    await Promise.all(
      openingCrawls.map((opening, id) => {
        return global.container.cradle.filmRepository.update({ id }, { opening_crawl: opening });
      }),
    );

    const response = await request(await global.container.cradle.server)
      .get("/api/films/words")
      .expect(StatusCodes.OK);

    const { uniqueWords, mostMentioned } = response.body;
    expect(uniqueWords).to.be.deep.equal(expectedUniqueWords);
    expect(mostMentioned).to.be.deep.equal(["Rey", "Darrok Ren"]);
  });

  it("should return monst mentioned character", async () => {
    const openingCrawls = [
      "The galaxy is in chaos.\n\nGeneral Poe Dameron leads a desperate mission to uncover the Order’s hidden base. Meanwhile, Rey, the last dark power.\n\n the...",
      "The Jedi are no more. Rey’s mysterious unbalanced and weak. In the shadows, a Rey’s new Sith Lord, DARROK REN.\n\nWith a mighty armada under his Rey command, Darrok Ren lays ...",
      "Emperor Palpatine. \n\nBut hope is not lost. MON MOTHMA secretly gathers dissidents to form the REBEL Rey ALLIANCE. The galaxy’s in now darkness...",
    ];

    await Promise.all(
      openingCrawls.map((opening, id) => {
        return global.container.cradle.filmRepository.update({ id }, { opening_crawl: opening });
      }),
    );

    const response = await request(await global.container.cradle.server)
      .get("/api/films/words")
      .expect(StatusCodes.OK);

    const { mostMentioned } = response.body;
    expect(mostMentioned).to.be.deep.equal("Rey");
  });
});
