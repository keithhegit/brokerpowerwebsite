// 初始化 IndexedDB
let db;
const dbName = "productImagesDB";
const storeName = "images";

const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };
    });
};

// 确保数据库已初始化
document.addEventListener('DOMContentLoaded', initDB);

// 处理图片上传
async function handleImageUpload(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        
        reader.onerror = function(e) {
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsDataURL(file);
    });
}

// 处理多个图片上传
async function handleMultipleImageUpload(files) {
    const promises = Array.from(files).map(file => handleImageUpload(file));
    return Promise.all(promises);
}

// 压缩图片
async function compressImage(base64String, maxWidth = 800) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64String;
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
    });
}

// 生成唯一的图片ID
function generateImageId(productId, index) {
    return `${productId}_${index}_${Date.now()}`;
}

// 保存图片到 IndexedDB
async function saveImage(productId, imageData, index) {
    const imageId = generateImageId(productId, index);
    const compressedImage = await compressImage(imageData);
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        
        const imageObject = {
            id: imageId,
            productId: productId,
            data: compressedImage,
            timestamp: Date.now()
        };
        
        const request = store.put(imageObject);
        
        request.onsuccess = () => resolve(imageId);
        request.onerror = () => reject(request.error);
    });
}

// 从 IndexedDB 获取图片
async function getImage(imageId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(imageId);
        
        request.onsuccess = () => resolve(request.result?.data);
        request.onerror = () => reject(request.error);
    });
}

// 保存产品图片
async function saveImagesToStorage(productId, images) {
    const imageIds = [];
    
    for (let i = 0; i < images.length; i++) {
        const imageId = await saveImage(productId, images[i], i);
        imageIds.push(imageId);
    }
    
    // 保存图片ID到 localStorage
    const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
    imageStorage[productId] = imageIds;
    localStorage.setItem('productImages', JSON.stringify(imageStorage));
    
    return imageIds;
}

// 获取产品图片
async function getImagesFromStorage(productId) {
    const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
    const imageIds = imageStorage[productId] || [];
    
    const images = [];
    for (const imageId of imageIds) {
        const imageData = await getImage(imageId);
        if (imageData) {
            images.push(imageData);
        }
    }
    
    return images;
}

// 删除产品图片
async function deleteProductImages(productId) {
    const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
    const imageIds = imageStorage[productId] || [];
    
    // 从 IndexedDB 删除图片
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    
    for (const imageId of imageIds) {
        store.delete(imageId);
    }
    
    // 从 localStorage 删除记录
    delete imageStorage[productId];
    localStorage.setItem('productImages', JSON.stringify(imageStorage));
}

// 显示图片预览
async function displayImagePreview(productId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const images = await getImagesFromStorage(productId);
    container.innerHTML = '';
    
    images.forEach((imageData, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'relative inline-block m-2';
        
        const img = document.createElement('img');
        img.src = imageData;
        img.className = 'w-24 h-24 object-cover rounded';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '×';
        deleteBtn.className = 'absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center';
        deleteBtn.onclick = async () => {
            const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
            const imageIds = imageStorage[productId] || [];
            imageIds.splice(index, 1);
            imageStorage[productId] = imageIds;
            localStorage.setItem('productImages', JSON.stringify(imageStorage));
            await displayImagePreview(productId, containerId);
        };
        
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(deleteBtn);
        container.appendChild(imgWrapper);
    });
} 