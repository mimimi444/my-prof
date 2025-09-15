'use client'
import React, { useState } from 'react';
import { postToBlueSky, getUserPosts, deleteAllPosts } from "../lib/api";

const DoPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

    async function clickBtn(){
        setIsLoading(true);
        setMessage('');
        try {
            await postToBlueSky('テスト：ボタンクリックでポストする');
            setMessage('ポストが成功しました！');
        } catch (error) {
            console.error('ポストに失敗しました:', error);
            setMessage('ポストに失敗しました');
        } finally {
            setIsLoading(false);
        }
    }

    async function getPostsBtn(){
        setIsLoading(true);
        setMessage('');
        try {
            const posts = await getUserPosts();
            setMessage(`${posts.length}件のポストを取得しました`);
            console.log('取得したポスト:', posts);
        } catch (error) {
            console.error('ポスト取得に失敗しました:', error);
            setMessage('ポスト取得に失敗しました');
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteAllBtn(){
        if (!confirm('本当に全ポストを削除しますか？この操作は取り消せません。')) {
            return;
        }
        
        setIsLoading(true);
        setMessage('');
        try {
            const results = await deleteAllPosts();
            const successCount = results.filter((r: { success: boolean }) => r.success).length;
            const failCount = results.filter((r: { success: boolean }) => !r.success).length;
            setMessage(`削除完了: 成功${successCount}件, 失敗${failCount}件`);
        } catch (error) {
            console.error('一括削除に失敗しました:', error);
            setMessage('一括削除に失敗しました');
        } finally {
            setIsLoading(false);
        }
    }

  return(
    <div className="p-4 space-y-4">
        <div className="space-x-2">
            <button 
                onClick={clickBtn} 
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {isLoading ? '処理中...' : 'ポストする'}
            </button>
            
            <button 
                onClick={getPostsBtn} 
                disabled={isLoading}
                className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {isLoading ? '処理中...' : 'ポスト一覧取得'}
            </button>
            
            <button 
                onClick={deleteAllBtn} 
                disabled={isLoading}
                className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {isLoading ? '処理中...' : '全ポスト削除'}
            </button>
        </div>
        
        {message && (
            <div className="p-2 bg-gray-100 rounded">
                {message}
            </div>
        )}
    </div>
  )
}

export default DoPost;
