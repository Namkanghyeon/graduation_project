import React, {useRef, useState} from "react";

export default function Home() {
    const [imageUrl, setImageUrl] = useState('')
    const fileInput = useRef() as React.RefObject<HTMLInputElement>;

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {
            target: {files},
        } = e;
        if (!files) return
        const file = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
            const target = finishedEvent.currentTarget as FileReader
            const result = target.result as string
            setImageUrl(result);
        };
        reader.readAsDataURL(file);
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const url = '';
        const res = await fetch(url, {
            method: 'post',

        })
        console.log(res);
    }

    return <>
        <div>
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt=""/>
                </div>
            )}
            <label htmlFor="attach-file">
                {!imageUrl ? (
                    <div>
                        <span>사진 선택</span>
                    </div>
                ) : (
                    <div>
                        <span>다시 선택</span>
                    </div>
                )}
            </label>
            <input
                accept="image/*"
                onChange={onUpload}
                ref={fileInput}
                id="attach-file"
                type="file"
                style={{
                    opacity: 0,
                }}
            />
            {imageUrl && <button onClick={onSubmit}>제출하기</button>}
        </div>
    </>
}