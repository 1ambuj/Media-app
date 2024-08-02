import { deleteObject, getDownloadURL, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from "../lib/firebase";
import { compressImage } from "./image-manipulator";

export const uploadFile = async (data, userId) => {
    const response = await fetch(data.uri)
    const blob = await response.blob()
    const filename = new Date().toISOString() + (data.uri.includes('.jpg') ? '.jpg' : '.mp4')
    const contentType = data.uri.includes('.mp4') ? 'video/mp4' : 'image/jpeg'
    const storageRef = ref(storage, `media/${userId}/${filename}`);
    const snapShot = await uploadBytes(storageRef,  blob, {
        contentType
    })
    const url = await getDownloadURL(storageRef)
    return { url, path: snapShot.metadata.fullPath, name: snapShot.metadata.name }
}


export const listAllMediaFiles = async (userId) => {
    const listRef = ref(storage, `media/${userId}`);
    const res = await listAll(listRef)

    const urlPromises = [];
    for (const item of res.items) {
        const fileRef = ref(storage, item.fullPath)
        urlPromises.push(getDownloadURL(fileRef))
    }

    const resolvedPromises = await Promise.allSettled(urlPromises)
    const urlList = []
    resolvedPromises.forEach((entry, index) => {
        if (entry.status === 'fulfilled') {
            urlList.push({ url: entry.value, path: res.items[index].fullPath, name: res.items[index].name })
        }
    })
    return urlList
}

export const deleteMediaFile = async (path) => {
    const mediaRef = ref(storage, path)
    await deleteObject(mediaRef)
}