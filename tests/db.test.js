import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import prisma from '../lib/db';

describe('Database Schema and Operations', () => {
  // Clean up test data before and after each test
  beforeEach(async () => {
    await prisma.project.deleteMany({
      where: {
        title: { contains: "Test DB" }
      }
    });
  });

  afterEach(async () => {
    await prisma.project.deleteMany({
      where: {
        title: { contains: "Test DB" }
      }
    });
  });

  describe('Project Model Schema', () => {
    it('should create a project with all required fields', async () => {
      const projectData = {
        title: "Test DB Project",
        description: "A test project for database validation",
        technologies: ["Next.js", "Prisma"]
      };

      const project = await prisma.project.create({
        data: projectData
      });

      expect(project.id).toBeDefined();
      expect(typeof project.id).toBe('number');
      expect(project.title).toBe(projectData.title);
      expect(project.description).toBe(projectData.description);
      expect(project.technologies).toEqual(projectData.technologies);
      expect(project.createdAt).toBeInstanceOf(Date);
      expect(project.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a project with optional fields', async () => {
      const projectData = {
        title: "Test DB Project with Images",
        description: "A test project with all optional fields",
        imageUrl: "/test-image.jpg",
        projectUrl: "https://test-project.com",
        githubUrl: "https://github.com/test/project",
        technologies: ["React", "TypeScript"]
      };

      const project = await prisma.project.create({
        data: projectData
      });

      expect(project.imageUrl).toBe(projectData.imageUrl);
      expect(project.projectUrl).toBe(projectData.projectUrl);
      expect(project.githubUrl).toBe(projectData.githubUrl);
    });

    it('should handle null optional fields correctly', async () => {
      const projectData = {
        title: "Test DB Project Minimal",
        description: "A test project with minimal data",
        technologies: ["JavaScript"]
      };

      const project = await prisma.project.create({
        data: projectData
      });

      expect(project.imageUrl).toBeNull();
      expect(project.projectUrl).toBeNull();
      expect(project.githubUrl).toBeNull();
    });

    it('should auto-generate id as incrementing integer', async () => {
      const project1 = await prisma.project.create({
        data: {
          title: "Test DB Project 1",
          description: "First test project",
          technologies: ["HTML"]
        }
      });

      const project2 = await prisma.project.create({
        data: {
          title: "Test DB Project 2",
          description: "Second test project",
          technologies: ["CSS"]
        }
      });

      expect(typeof project1.id).toBe('number');
      expect(typeof project2.id).toBe('number');
      expect(project2.id).toBeGreaterThan(project1.id);
    });

    it('should automatically set createdAt and updatedAt timestamps', async () => {
      const beforeCreate = new Date();
      
      const project = await prisma.project.create({
        data: {
          title: "Test DB Project Timestamps",
          description: "Testing timestamp functionality",
          technologies: ["Node.js"]
        }
      });

      const afterCreate = new Date();

      expect(project.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      expect(project.createdAt.getTime()).toBeLessThanOrEqual(afterCreate.getTime());
      expect(project.updatedAt.getTime()).toBeGreaterThanOrEqual(project.createdAt.getTime());
    });

    it('should update updatedAt timestamp on record modification', async () => {
      // Use a title that won't be caught by the cleanup (no "Test DB")
      const project = await prisma.project.create({
        data: {
          title: "Timestamp Update Project",
          description: "Testing update functionality",
          technologies: ["Vue.js"]
        }
      });

      const originalUpdatedAt = project.updatedAt;
      const projectId = project.id;
      
      // Wait a bit to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 50));

      // Update immediately - the project should still exist since title doesn't match cleanup pattern
      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: { title: "Timestamp Update Project Modified" }
      });

      expect(updatedProject.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
      expect(updatedProject.createdAt.getTime()).toBe(project.createdAt.getTime());
    });
  });

  describe('Database Queries', () => {
    it('should fetch all projects with findMany', async () => {
      // Create test projects first
      await prisma.project.createMany({
        data: [
          {
            title: "Test DB Query Project 1",
            description: "First query test project",
            technologies: ["React"]
          },
          {
            title: "Test DB Query Project 2",
            description: "Second query test project",
            technologies: ["Vue.js"]
          },
          {
            title: "Test DB Query Project 3",
            description: "Third query test project",
            technologies: ["Angular"]
          }
        ]
      });

      const projects = await prisma.project.findMany({
        where: {
          title: { contains: "Test DB Query" }
        }
      });

      expect(projects.length).toBeGreaterThanOrEqual(3);
      expect(projects.every(p => p.title.includes("Test DB Query"))).toBe(true);
    });

    it('should fetch projects ordered by creation date (newest first)', async () => {
      // Use a unique identifier that won't conflict with cleanup
      const uniqueId = Date.now();
      const title1 = `Order Test ${uniqueId} First`;
      const title2 = `Order Test ${uniqueId} Second`;

      // Clean up any existing test data first
      await prisma.project.deleteMany({
        where: {
          title: { contains: `Order Test ${uniqueId}` }
        }
      });

      const project1 = await prisma.project.create({
        data: {
          title: title1,
          description: "First query test project",
          technologies: ["React"]
        }
      });
      
      // Wait a bit to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const project2 = await prisma.project.create({
        data: {
          title: title2,
          description: "Second query test project",
          technologies: ["Vue.js"]
        }
      });

      // Store IDs immediately
      const project1Id = project1.id;
      const project2Id = project2.id;

      // Query immediately using IDs to avoid any cleanup interference
      const projects = await prisma.project.findMany({
        where: {
          id: { in: [project1Id, project2Id] }
        },
        orderBy: { createdAt: 'desc' }
      });

      // If we only got one, verify both exist
      if (projects.length < 2) {
        const verify1 = await prisma.project.findUnique({ where: { id: project1Id } });
        const verify2 = await prisma.project.findUnique({ where: { id: project2Id } });
        expect(verify1).not.toBeNull();
        expect(verify2).not.toBeNull();
      }

      expect(projects.length).toBe(2);
      
      // Verify the order (newest first) - project2 should be first
      expect(projects[0].id).toBe(project2Id);
      expect(projects[1].id).toBe(project1Id);
      expect(projects[0].createdAt.getTime()).toBeGreaterThanOrEqual(
        projects[1].createdAt.getTime()
      );
    });

    it('should fetch a single project with findUnique', async () => {
      const project = await prisma.project.create({
        data: {
          title: "Test DB Query Unique Project",
          description: "Query test project",
          technologies: ["React"]
        }
      });
      
      // Store the ID to ensure we're querying the right project
      const projectId = project.id;
      
      const foundProject = await prisma.project.findUnique({
        where: { id: projectId }
      });

      expect(foundProject).not.toBeNull();
      expect(foundProject.id).toBe(projectId);
      expect(foundProject.title).toBe(project.title);
    });

    it('should return null for findUnique with non-existent id', async () => {
      const project = await prisma.project.findUnique({
        where: { id: 99999 }
      });

      expect(project).toBeNull();
    });

    it('should update a project record', async () => {
      const uniqueId = Date.now();
      const project = await prisma.project.create({
        data: {
          title: `Update Record Test ${uniqueId} Original`,
          description: "Original description",
          technologies: ["JavaScript"]
        }
      });

      const projectId = project.id;
      
      // Verify project exists before updating
      const verify = await prisma.project.findUnique({ where: { id: projectId } });
      expect(verify).not.toBeNull();

      const updatedProject = await prisma.project.update({
        where: { id: projectId },
        data: {
          title: `Update Record Test ${uniqueId} Modified`,
          description: "Updated description",
          technologies: ["TypeScript"]
        }
      });

      expect(updatedProject.title).toBe(`Update Record Test ${uniqueId} Modified`);
      expect(updatedProject.description).toBe("Updated description");
      expect(updatedProject.technologies).toEqual(["TypeScript"]);
      expect(updatedProject.id).toBe(projectId);
    });

    it('should delete a project record', async () => {
      const project = await prisma.project.create({
        data: {
          title: "Delete Test Project",
          description: "This will be deleted",
          technologies: ["React"]
        }
      });

      const projectId = project.id;

      await prisma.project.delete({
        where: { id: projectId }
      });

      const deletedProject = await prisma.project.findUnique({
        where: { id: projectId }
      });

      expect(deletedProject).toBeNull();
    });
  });

  describe('Data Validation', () => {
    it('should enforce required fields (title)', async () => {
      await expect(
        prisma.project.create({
          data: {
            description: "Missing title",
            technologies: ["JavaScript"]
          }
        })
      ).rejects.toThrow();
    });

    it('should enforce required fields (description)', async () => {
      await expect(
        prisma.project.create({
          data: {
            title: "Missing description",
            technologies: ["JavaScript"]
          }
        })
      ).rejects.toThrow();
    });

    it('should enforce required fields (technologies)', async () => {
      await expect(
        prisma.project.create({
          data: {
            title: "Missing technologies",
            description: "This project has no tech stack"
          }
        })
      ).rejects.toThrow();
    });

    it('should accept empty array for technologies', async () => {
      const project = await prisma.project.create({
        data: {
          title: "Test DB Empty Tech Stack",
          description: "Project with empty technologies array",
          technologies: []
        }
      });

      expect(project.technologies).toEqual([]);
    });

    it('should handle string array for technologies correctly', async () => {
      const technologies = ["React", "Next.js", "Tailwind CSS", "Prisma"];
      
      const project = await prisma.project.create({
        data: {
          title: "Test DB Multiple Technologies",
          description: "Project with multiple technologies",
          technologies: technologies
        }
      });

      expect(project.technologies).toEqual(technologies);
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(project.technologies.length).toBe(4);
    });
  });
});