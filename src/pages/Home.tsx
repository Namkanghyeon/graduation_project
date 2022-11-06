import React, { useRef, useState } from 'react';
import '../styles/home.css';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const fileInput = useRef() as React.RefObject<HTMLInputElement>;

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { files },
    } = e;
    if (!files) return;
    const file = files[0];

    const url = 'https://7dcd-125-131-168-161.jp.ngrok.io/transfer/';
    const fd = new FormData();
    fd.append('pic', file);

    (async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {},
          body: fd
        })
        const json = await response.json()
        setResult(json.result)
      } catch (error) {
        alert('API 호출 에러')
      }
    })()

    const reader = new FileReader();
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      const target = event.target as FileReader;
      const result = target.result as string;
      setImageUrl(result);
      setResult('');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="home-container">
      {imageUrl ? (
        <div className="when-uploaded">
          <img src={imageUrl} alt="uploaded" className="uploaded-image" />

          {result && (
            <p className="result">
              {result === 'available'
                ? '재활용 가능합니다.'
                : '재활용 불가능합니다.'}
            </p>
          )}
          {result && (
            <label className="button button-retry" htmlFor="attach-file">
              <span className="button-inner">다시 선택</span>
            </label>
          )}
        </div>
      ) : (
        <label className="blank-space" htmlFor="attach-file">
          <span className="material-icons plus-icon">add</span>
        </label>
      )}

      <input
        accept="image/*"
        onChange={onUpload}
        ref={fileInput}
        id="attach-file"
        type="file"
        style={{
          display: 'none',
        }}
      />
    </div>
  );
}
