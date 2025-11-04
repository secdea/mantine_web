export default class miscUtils {
    static jsonToTableData(vJson: any) {
        var pOut = {
            head: vJson.ColumnsArray,
            body: vJson.Rows.map((vRow: any) =>
                vJson.ColumnsArray.map((vCol: string) => vRow[vCol])
            )
        };
        return pOut;
    }

    static getErrorMessage(error: unknown): string {
        return error instanceof Error ? error.message : String(error);
    }
}