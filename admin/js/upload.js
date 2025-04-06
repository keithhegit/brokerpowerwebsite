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

// 保存图片到 localStorage
function saveImagesToStorage(productId, images) {
    const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
    imageStorage[productId] = images;
    localStorage.setItem('productImages', JSON.stringify(imageStorage));
}

// 从 localStorage 获取图片
function getImagesFromStorage(productId) {
    const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
    return imageStorage[productId] || [];
}

// 删除产品图片
function deleteProductImages(productId) {
    const imageStorage = JSON.parse(localStorage.getItem('productImages') || '{}');
    delete imageStorage[productId];
    localStorage.setItem('productImages', JSON.stringify(imageStorage));
} 