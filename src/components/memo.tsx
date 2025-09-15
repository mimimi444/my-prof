'use client'
import React, { useState } from 'react';

interface Memo {
  id: number;
  text: string;
  createdAt: Date;
}

const Memo = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [inputText, setInputText] = useState('');

  // メモを追加する関数
  const addMemo = () => {
    if (inputText.trim() === '') {
      alert('メモを入力してください');
      return;
    }

    const newMemo: Memo = {
      id: Date.now(),
      text: inputText,
      createdAt: new Date()
    };

    setMemos([newMemo, ...memos]);
    setInputText('');
  };

  // メモを削除する関数
  const deleteMemo = (id: number) => {
    if (confirm('このメモを削除しますか？')) {
      setMemos(memos.filter(memo => memo.id !== id));
    }
  };

  // Enterキーでメモを追加
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addMemo();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">メモ機能</h2>
      
      {/* 入力エリア */}
      <div className="mb-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="メモを入力してください..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={addMemo}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            メモを追加
          </button>
        </div>
      </div>

      {/* メモリストエリア */}
      <div className="memo-list">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          メモ一覧 ({memos.length}件)
        </h3>
        
        {memos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            まだメモがありません。上記のテキストエリアからメモを追加してください。
          </div>
        ) : (
          <div className="space-y-3">
            {memos.map((memo) => (
              <div
                key={memo.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 whitespace-pre-wrap break-words">
                      {memo.text}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {memo.createdAt.toLocaleString('ja-JP')}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMemo(memo.id)}
                    className="ml-3 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Memo;