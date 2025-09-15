// Blue Skyにポストする関数（API Route経由）
export async function postToBlueSky(text: string) {
  try {
    const response = await fetch('/api/bluesky', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'ポストに失敗しました');
    }
    
    console.log('ポストが成功しました:', result);
    return result.data;
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  }
}

// ユーザーのポスト一覧を取得する関数（API Route経由）
export async function getUserPosts() {
  try {
    const response = await fetch('/api/bluesky', {
      method: 'GET',
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'ポスト取得に失敗しました');
    }
    
    console.log('ポスト一覧を取得しました:', result.data);
    return result.data;
  } catch (error) {
    console.error('ポスト取得エラー:', error);
    throw error;
  }
}

// 全ポストを一括削除する関数（API Route経由）
export async function deleteAllPosts() {
  try {
    const response = await fetch('/api/bluesky', {
      method: 'DELETE',
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || '一括削除に失敗しました');
    }
    
    console.log('一括削除完了:', result.data);
    return result.data;
  } catch (error) {
    console.error('一括削除エラー:', error);
    throw error;
  }
}