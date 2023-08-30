import { useMutation } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

export interface FileUploadParams {
  file: File;
  params: {
    objectId: string;
    objectType: string;
  };
}

const uploadFile = async ({ file, params }: FileUploadParams) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("objectId", params.objectId);
  formData.append("objectType", params.objectType);

  try {
    const response = await axios.post<unknown[]>("/files", formData);

    if (!response || response.status !== 200) {
      throw new Error("檔案上傳失敗");
    }

    return response.data[0];
  } catch (error) {
    console.error("檔案上傳出錯:", error);
    throw error;
  }
};

export const useFileUpload = () => {
  return useMutation(uploadFile);
};

export default useFileUpload;
