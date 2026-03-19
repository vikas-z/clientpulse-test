import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const startTime = Date.now();

export async function GET() {
  let dbStatus = 'connected';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    dbStatus = 'disconnected';
  }

  return NextResponse.json({
    status: dbStatus === 'connected' ? 'healthy' : 'degraded',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    database: dbStatus,
    version: process.env.npm_package_version || '1.3.0',
    timestamp: new Date().toISOString(),
  });
}