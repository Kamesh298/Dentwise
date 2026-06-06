// Lazy-load the Vapi library to avoid bundling it on the server
export async function createVapi() {
  const mod = await import("@vapi-ai/web");
  const Vapi = mod?.default ?? mod;
  return new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string);
}
