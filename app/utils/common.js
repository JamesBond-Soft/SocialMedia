import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE,
  OTHER_FILE
} from './constants';

export default function getFileType(fileName) {
  const ext = fileName.split('.').pop();
  const audioTypes = ['mp3', 'wav', 'ogg', 'wma'];
  const videoTypes = ['avi', 'mp4', 'mov'];
  const documentTypes = ['doc', 'docx', 'txt', 'pdf'];
  const imageTypes = ['png', 'jpg', 'jpeg'];
  if (audioTypes.includes(ext)) {
    return AUDIO_FILE;
  } else if (videoTypes.includes(ext)) {
    return VIDEO_FILE;
  } else if (documentTypes.includes(ext)) {
    return DOCUMENT_FILE;
  } else if (imageTypes.includes(ext)) {
    return IMAGE_FILE;
  }
  return OTHER_FILE;
}

export function findWithAttr(array, attr, value) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
