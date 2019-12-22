const uuidv4 = require("uuid/v4");
const Minio = require("minio");
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.send('Running');
};

/**
 * GET /api/getpresignedurl
 * Get Presigned Url API
 */
exports.getPresignedUrl = async (req, res, next) => {
  const fileName = uuidv4();
  console.log("Key/filename", fileName);

  const presignedUrl = await minioClient.presignedPutObject(
    process.env.MINIO_BUCKET,
    fileName,
    parseInt(process.env.MINIO_PRESIGNED_URL_EXPIRY)
  );
  res.send({ presignedUrl, fileName });
};

