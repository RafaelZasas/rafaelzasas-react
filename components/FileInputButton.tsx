import {ChangeEvent, Dispatch, Fragment, SetStateAction, useContext, useEffect, useState} from 'react';
import {ToastContext} from '../lib/context';
import {ButtonProps, FileData} from '../lib/types';
import Button from './Button';

const errorHeadings = ['Whoops', 'Uh Oh', 'Oh Shucks', 'Yikes', 'Problemo', 'Thing is...'];

interface FileInputButtonProps extends ButtonProps {
  id: string;
  name: string;
  allowedExtensions: Array<'jpg' | 'jpeg' | 'png' | 'gif' | 'pdf'>;
  onUpload: (FileData) => void;
  maxFileSizeInKB: number;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

/**
 * Reusable button component with optional icon(s) to the left or right of button text
 * Button will fill container space on small devices and decide
 */
export default function FileInputButton(props: FileInputButtonProps) {
  const {setToastData, setShowToast} = useContext(ToastContext);

  const onPickFile = (e) => {
    e.preventDefault();
    document.getElementById(props.id).click();
  };

  const onFilePicked = (e: ChangeEvent<HTMLInputElement>) => {
    props.setLoading(true);

    let files = e.target.files;
    let fileName = files[0].name;
    let fileSize = getFileSize(files[0].size);
    let fileSizeKB = getFileSizeKB(files[0].size);
    let fileType = getFileType(files[0]).toLowerCase();

    const validateFileSize = (): boolean => {
      if (props.maxFileSizeInKB && fileSizeKB > props.maxFileSizeInKB) {
        props.setLoading(false);
        setToastData({
          heading: 'File is too large',
          type: 'error',
          body: `Max allowed file size is ${props?.maxFileSizeInKB} kb`,
        });
        setShowToast(true);
        return false;
      }
      return true;
    };

    const validateFileType = (): boolean => {
      if (props?.allowedExtensions && !arrToLowerCase(props?.allowedExtensions).includes(fileType)) {
        props.setLoading(false);
        setToastData({
          heading: errorHeadings[Math.ceil(Math.random() * 5)],
          type: 'error',
          body: `Allowed file types are ${props.allowedExtensions} only`,
        });
        setShowToast(true);
        return false;
      }
      return true;
    };

    let fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const fileData: FileData = {
        name: fileName,
        size: fileSize,
        sizeInKB: fileSizeKB,
        type: fileType,
        src: fileReader.result as string,
      };
      const validFileSize = validateFileSize();
      const validFileType = validateFileType();
      if (validFileType && validFileSize) {
        props.onUpload(fileData);
      }
    });
    fileReader.readAsDataURL(files[0]);
  };

  return (
    <Fragment>
      <Button
        text={props.text}
        type="button"
        id="fileInputButton"
        buttonStyle={props.buttonStyle}
        function={(e) => onPickFile(e)}
      />

      <input
        data-show-upload="true"
        data-show-caption="true"
        onChange={(e) => {
          if (e.target.files) {
            onFilePicked(e);
          }
        }}
        type={'file'}
        required={props.required || false}
        className={'hidden'}
        accept="*"
        name={props.name || 'myFile'}
        id={props.id || 'myFile'}
      />
    </Fragment>
  );
}

const getFileSize = (file_size: number): string => {
  let size = '';
  if (file_size / 1024 >= 1024) {
    size = `${Math.ceil(file_size / 1024 / 1024)} MB`;
  } else {
    size = `${Math.ceil(file_size / 1024)} KB`;
  }
  return size;
};

const getFileSizeKB = (file_size: number) => {
  file_size = Math.ceil(file_size / 1024);
  return file_size;
};

const getFileType = (file: File) => {
  return file?.type.split('/').pop();
};

const arrToLowerCase = (arr: string[]) => {
  return arr.map((str) => str.toLowerCase());
};
