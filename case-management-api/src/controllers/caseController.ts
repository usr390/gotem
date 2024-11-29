import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateCaseDTO, UpdateCaseDTO } from '../types';

const prisma = new PrismaClient();

export const caseController = {
  async createCase(req: Request<{}, {}, CreateCaseDTO>, res: Response) {
    try {
      const { title, description, userId, files } = req.body;

      const newCase = await prisma.case.create({
        data: {
          title,
          description,
          submittedBy: { connect: { id: userId } },
          audit: {
            create: {
              action: 'CASE_SUBMITTED',
              userId,
              userName: 'John Doe', // You'd get this from auth
              details: 'Case submitted'
            }
          },
          files: files ? {
            create: files
          } : undefined
        },
        include: {
          submittedBy: true,
          audit: true,
          files: true
        }
      });

      res.status(201).json(newCase);
    } catch (error) {
      console.error('Create case error:', error);
      res.status(500).json({ error: 'Failed to create case' });
    }
  },

  async getCases(req: Request, res: Response) {
    try {
      const cases = await prisma.case.findMany({
        include: {
          submittedBy: true,
          audit: true,
          files: true
        }
      });
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cases' });
    }
  },

  async updateCase(
    req: Request<{ id: string }, {}, UpdateCaseDTO>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCase = await prisma.case.update({
        where: { id },
        data: updateData,
        include: {
          submittedBy: true,
          audit: true,
          files: true
        }
      });

      res.json(updatedCase);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update case' });
    }
  }
};