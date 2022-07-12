import request from 'supertest'
import app from '../server/app.js'

describe("GET/qa/questions", () => {
  describe("given a valid question_id", () => {
    test("should respond with a 200 status", async () => {
      let id = 1;
      const response = await request(app).get(`/qa/questions?product_id=${id}`).send()
      expect(response.statusCode).toBe(200)
    });
    test("should specify json in the content type header", async () => {
      let id = 1;
      const response = await request(app).get(`/qa/questions?product_id=${id}`).send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    });
  })

  describe("given a invalid question_id", () => {
    test("should throw an err", async () => {
      let id = 'haha';
      const response = await request(app).get(`/qa/questions?product_id=${id}`).send()
      expect(() => {
        response.statusCode.toBe(400)
      }).toThrow();
    })
  });
})

describe("POST /qa/questions", () => {
  describe("given body, name, email, product_id", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/qa/questions").send({
        question: {
          body: "test question body",
          name: "test asker name",
          email: 'testemail@gmail.com',
          product_id: 10
        }
      })
      expect(response.statusCode).toBe(201)
    })
  })
})
describe("PUT /qa/questions/:question_id/helpful", () => {
  describe("provide a valid question_id", () => {
    test("should respond with a 204 status", async () => {
      const response = await request(app).put('/qa/questions/:question_id/helpful?question_id=10').send()
      expect(response.statusCode).toBe(204)
    });
  })
})

describe("PUT /qa/questions/:question_id/report", () => {
  describe("provide a valid question_id", () => {
    test("should respond with a 204 status", async () => {
      const response = await request(app).put('/qa/questions/:question_id/report?question_id=10').send()
      expect(response.statusCode).toBe(204)
    });
  })
})

describe("GET /qa/questions/:question_id/answers", () => {
  describe("given a valid question_id", () => {
    test("should respond with a 200 status", async () => {
      const response = await request(app).get('/qa/questions/:question_id/answers?question_id=1').send()
      expect(response.statusCode).toBe(200)
    });
    test("should specify json in the content type header", async () => {
      const response = await request(app).get('/qa/questions/:question_id/answers?question_id=1').send()
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    });
  })
})

describe("POST /qa/questions/:question_id/answers", () => {
  describe("given body, name, email, product_id", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/qa/questions/:question_id/answers?question_id=10").send({
        answer: {
          body: "test answer body",
          name: "test answerer name",
          email: 'testemail@gmail.com',
          photos: []
        }
      })
      expect(response.statusCode).toBe(201)
    })

  })
})
describe("PUT /qa/answers/:answer_id/helpful", () => {
  describe("provide a valid answer_id", () => {
    test("should respond with a 204 status", async () => {
      const response = await request(app).put('/qa/answers/:answer_id/helpful?answer_id=8').send()
      expect(response.statusCode).toBe(204)
    });
  })
})

describe("PUT /qa/answers/:answer_id/report", () => {
  describe("provide a valid question_id", () => {
    test("should respond with a 204 status", async () => {
      const response = await request(app).put('/qa/answers/:answer_id/report?answer_id=100').send()
      expect(response.statusCode).toBe(204)
    });
  })
})