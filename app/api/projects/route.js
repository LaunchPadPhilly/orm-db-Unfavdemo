import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3  // Limit to only 3 projects
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;
    
    if (!title || !description || !technologies?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies
      }
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
