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

    const reader = new FileReader();
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const target = finishedEvent.currentTarget as FileReader;
      const result = target.result as string;
      setImageUrl(result);
      setResult('');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();

    const url = '';
    const fd = new FormData();
    console.log(imageUrl);
    fd.append('file', imageUrl);
    console.log(fd.values());

    // (async () => {
    //   try {
    //     const response = await fetch(url, {
    //       method: 'POST',
    //       headers: {},
    //       body: fd
    //     })
    //     setResult(response.data.result)
    //   } catch (error) {
    //     alert('API 호출 에러')
    //   }
    // })()

    const demoResponse = {
      data: {
        result: 'available',
      },
    };
    setResult(demoResponse.data.result);
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
          <label className="button button-retry" htmlFor="attach-file">
            <span className="button-inner">다시 선택</span>
          </label>
          {!result && (
            <label className="button button-submit" onClick={onSubmit}>
              <span className="button-inner">판독</span>
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
