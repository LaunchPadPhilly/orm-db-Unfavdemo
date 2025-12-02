import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: id }
    });
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;
    
    // Check if project exists first
    const existingProject = await prisma.project.findUnique({
      where: { id: id }
    });
    
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Validate required fields if provided
    if (title !== undefined && !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (description !== undefined && !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (technologies !== undefined && (!technologies || !technologies.length)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build update data object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (projectUrl !== undefined) updateData.projectUrl = projectUrl;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (technologies !== undefined) updateData.technologies = technologies;

    const project = await prisma.project.update({
      where: { id: id },
      data: updateData
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    try {
      await prisma.project.delete({
        where: { id: id }
      });
      
      return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}