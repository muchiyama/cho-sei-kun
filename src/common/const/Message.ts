class Message {

    /**
     * NewLine
     */
    public static NewLine: string = '\r\n';

    /**
     * ${msg}にはログインが必要です
     * @param msg
     */
    public static I0001(msg: string): string {
        return `${msg}にはログインが必要です`;
    }

    /**
     * ${msg}が完了しました
     * @param msg
     */
    public static I0002(msg: string): string {
        return `${msg}が完了しました`;
    }

    /**
     * ${msg}へ移動します
     * @param msg
     */
    public static I0003(msg: string): string {
        return `${msg}へ移動します`;
    }

    /**
     * ${msg}しました
     * @param msg
     */
    public static I0004(msg: string): string {
        return `${msg}しました`;
    }

    /**
     * ${msg}は既に登録されています
     * @param msg
     */
    public static I0005(msg: string): string {
        return `${msg}は既に登録されています`;
    }

    /**
     * ${msg}をお使いください
     * @param msg
     */
    public static I0006(msg: string): string {
        return `${msg}をお使いください`;
    }


    /**
     * ${msg}の実行中に致命的なエラーが発生しました
     * @param msg
     */
    public static E0001(msg: string): string {
        return `${msg}の実行中に致命的なエラーが発生しました`;
    }

    /**
     * ${msg}の作成に失敗しました
     * @param msg
     */
    public static E0002(msg: string): string {
        return `${msg}に失敗しました`;
    }

}

export default Message;
