import { NextRequest, NextResponse } from 'next/server';
import { BskyAgent } from "@atproto/api";

const agent = new BskyAgent({
  service: "https://bsky.social",
});

// Blue Skyにログインする関数
async function loginToBlueSky() {
  try {
    await agent.login({
      identifier: 'mizu-mizu-0720.bsky.social',
      password: 'WbA5YpzuxR25mf9'
    });
    return true;
  } catch (error) {
    console.error('ログインエラー:', error);
    return false;
  }
}

// POST: ポストを作成
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    const isLoggedIn = await loginToBlueSky();
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'ログインに失敗しました' }, { status: 401 });
    }
    
    const result = await agent.post({
      text: text,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('ポストエラー:', error);
    return NextResponse.json({ error: 'ポストに失敗しました' }, { status: 500 });
  }
}

// GET: ポスト一覧を取得
export async function GET() {
  try {
    const isLoggedIn = await loginToBlueSky();
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'ログインに失敗しました' }, { status: 401 });
    }

    const posts = await agent.getAuthorFeed({
      actor: 'mizu-mizu-0720.bsky.social',
      limit: 100
    });

    return NextResponse.json({ success: true, data: posts.data.feed });
  } catch (error) {
    console.error('ポスト取得エラー:', error);
    return NextResponse.json({ error: 'ポスト取得に失敗しました' }, { status: 500 });
  }
}

// DELETE: 全ポストを削除
export async function DELETE() {
  try {
    const isLoggedIn = await loginToBlueSky();
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'ログインに失敗しました' }, { status: 401 });
    }

    // ポスト一覧を取得
    const posts = await agent.getAuthorFeed({
      actor: 'mizu-mizu-0720.bsky.social',
      limit: 100
    });

    const deleteResults = [];

    for (const post of posts.data.feed) {
      if (post.post.author.did === agent.session?.did) {
        try {
          await agent.deletePost(post.post.uri);
          deleteResults.push({ success: true, uri: post.post.uri });
        } catch (error) {
          deleteResults.push({ success: false, uri: post.post.uri, error: (error as Error).message });
        }
      }
    }

    return NextResponse.json({ success: true, data: deleteResults });
  } catch (error) {
    console.error('一括削除エラー:', error);
    return NextResponse.json({ error: '一括削除に失敗しました' }, { status: 500 });
  }
}
