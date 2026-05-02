/**
 * LINE LIFF stub / mock layer
 *
 * - NEXT_PUBLIC_LIFF_ID が設定されていない場合は IS_MOCK = true になり、
 *   すべての関数はモック動作（console.log / ダミーデータ）で応答する。
 * - 実際の LIFF SDK を使う場合は IS_MOCK = false の分岐に本実装を追加する。
 */

export const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID ?? ''
export const IS_MOCK = !LIFF_ID

/** LIFF SDK 初期化（実装時: liff.init({ liffId: LIFF_ID }) を呼ぶ） */
export async function initLIFF(): Promise<void> {
  if (IS_MOCK) {
    console.log('[LINE mock] initLIFF() called — running in mock mode')
    return
  }
  // TODO: 実際連携時は @line/liff をインストールして以下を有効化
  // const liff = (await import('@line/liff')).default
  // await liff.init({ liffId: LIFF_ID })
}

/** ログイン中ユーザーのプロフィールを取得 */
export async function getLINEProfile(): Promise<{
  userId: string
  displayName: string
  pictureUrl?: string
} | null> {
  if (IS_MOCK) {
    console.log('[LINE mock] getLINEProfile() — returning mock profile')
    return { userId: 'mock_user', displayName: 'Mock User', pictureUrl: undefined }
  }
  // TODO: 実際連携時
  // const liff = (await import('@line/liff')).default
  // if (!liff.isLoggedIn()) return null
  // return await liff.getProfile()
  return null
}

/**
 * Flex Message 送信（Messaging API）
 * @param to   送信先 userId（LINE Messaging API の userId）
 * @param contents  Flex Message の contents オブジェクト
 */
export async function sendFlexMessage(to: string, contents: object): Promise<void> {
  if (IS_MOCK) {
    console.log('[LINE mock] sendFlexMessage()', { to, contents })
    return
  }
  // TODO: 実際連携時 — サーバーサイドの /api/line/send エンドポイントを呼ぶ
  // await fetch('/api/line/send', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ to, contents }),
  // })
}

/** LIFF ブラウザ（LINE アプリ内 WebView）で開かれているか判定 */
export function isInLIFF(): boolean {
  if (typeof window === 'undefined') return false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !!(window as any).__liff
}
