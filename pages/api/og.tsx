import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { SiteURL } from '../about';
 
export const config = {
  runtime: 'edge',
};
 
export default async function handler(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title');
 
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width="256"
          height="256"
          src={`${SiteURL}/avatar.png`}
        />
        <p>{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}