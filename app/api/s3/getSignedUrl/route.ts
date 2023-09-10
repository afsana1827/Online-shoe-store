import { getS3 } from "@/config";
import { NextRequest, NextResponse } from "next/server";
const { s3 } = getS3();
export const POST = async (req: NextRequest) => {
  const { Key, Type, Folder } = await req.json();
  try {
    const fileParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: Folder + "/" + Key,
      ContentType: Type,
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 400 });
  }
};
