import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import axios from 'axios';
import console from 'console';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([]);
});

repos.get('/api', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  await axios
    .get<Repo[]>('https://api.github.com/users/silverorange/repos')
    .then((result) => {
      const { data } = result;
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
