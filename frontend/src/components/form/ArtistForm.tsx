import ImageUploader from '@/components/uploader/ImageUploader'
import FileUploader from '@/components/uploader/FileUploader'
import Editor from '@/components/editor/Editor'
import { ChangeEvent, MutableRefObject, SyntheticEvent, useCallback, useRef, useState } from 'react'

// image file FormData 전송 테스트용
async function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onloadend = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

type Genre = {
  genre: string
  label: string
}

export default function ArtistForm() {
  // TODO: data fetching으로 장르 정보 불러오기
  const genreRange: Genre[] = [
    {
      genre: 'acting',
      label: '연기',
    },
    {
      genre: 'making',
      label: '제작',
    },
    {
      genre: 'singing',
      label: '노래',
    },
    {
      genre: 'dancing',
      label: '춤',
    },
  ]

  // TODO: 여러 ref 객체 관리하는 util 함수 정의(refactoring)
  const artistGenre = useRef('')
  const artistDetailedGenreOne = useRef('')
  const artistDetailedGenreTwo = useRef('')
  const artistDetailedGenreThree = useRef('')
  const artistDetailedGenres: MutableRefObject<string>[] = [
    artistDetailedGenreOne,
    artistDetailedGenreTwo,
    artistDetailedGenreThree,
  ]
  const artistContent = useRef('')

  const selectedArea = useRef('seoul')
  const selectedMeetingType = useRef('online')
  // const mainImage = useRef<File>(null)
  const mainImage = useRef<string>('')

  const youTubeLink = useRef('')

  // const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageFiles, setImageFiles] = useState<string[]>([])
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([])

  // TODO: 서버로 FormData 전송
  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = new FormData()
    const jsonData = {
      userId: '1',
      genre: artistGenre.current,
      location: selectedArea.current,
    }
    formData.append('info', JSON.stringify(jsonData))
    formData.append('images', JSON.stringify(imageFiles))

    await fetch('/api/projects', {
      method: 'POST',
      body: formData,
    })
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, refObj: MutableRefObject<string>) => {
    refObj.current = e.target.value
  }

  const editorHandler = (value: string) => {
    artistContent.current = value
  }

  return (
    // TODO: 일반 문자로 처리한 부분을 next-translate 사용해서 t()형태로 변환
    // TODO: 반복되는 input label 컴포넌트화 및 재활용
    <form className="flex flex-col space-y-4 pb-10" onSubmit={submitHandler}>
      <div>
        <h2> 아티스트 장르 </h2>
        <div>
          {genreRange.map((elem, idx) => {
            return (
              <div key={`artist-${idx}`}>
                <input className="mr-1.5" type="radio" id={`artist-${elem.genre}`} name="genre" />
                <label htmlFor={`artist-${elem.genre}`}>{elem.label}</label>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {['관심 분야 1', '관심 분야 2', '관심 분야 3'].map((tpy, idx) => {
          return (
            <div key={idx}>
              <p> {tpy} </p>
              <input
                type="text"
                className="border-2"
                name={`detail-genre-${idx + 1}`}
                id={`detail-genre-${idx + 1}`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(e, artistDetailedGenres[idx])}
              />
            </div>
          )
        })}
      </div>
      <div className="h-52">
        <h2> 아티스트 소개 글 </h2>
        <Editor onEditorUpdated={editorHandler} />
      </div>
      <div>
        <h2> 활동 지역</h2>
        <div className="flex gap-3">
          <select
            className="border-2"
            name="area"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeHandler(e, selectedArea)}
          >
            <option defaultChecked value="seoul">
              서울
            </option>
            <option value="busan">부산</option>
            <option value="goyang">고양</option>
            <option value="incheon">인천</option>
          </select>
          <select
            className="border-2"
            name="meeting-type"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeHandler(e, selectedMeetingType)}
          >
            <option defaultChecked value="online">
              온라인
            </option>
            <option value="offline">오프라인</option>
            <option value="no-matter">상관없음</option>
          </select>
        </div>
      </div>
      <div>
        <h2> 아티스트 메인 이미지 </h2>
        <ImageUploader
          onImageUpload={async (image) => {
            const base64 = await toBase64(image)
            mainImage.current = base64 as string
          }}
        />
      </div>
      <div>
        <h2> 아티스트 보조 이미지 </h2>
        <ImageUploader
          onImageUpload={async (image) => {
            const base64 = await toBase64(image)
            setImageFiles((prev) => [...prev, base64 as string])
          }}
        />
      </div>
      <div>
        <h2> 포트폴리오 업로드 </h2>
        <FileUploader onFileUpload={(files) => {}} />
      </div>
      <div>
        <h2> 참고 링크 </h2>
        <div>
          <div>
            <label className="w-1/6" htmlFor="youtube">
              유튜브{' '}
            </label>
            <input
              className="w-5/6 border-2"
              type="url"
              id="youtube"
              name="youtube"
              pattern="https://.*"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
      <button className="border-2"> 등록하기 </button>
    </form>
  )
}
