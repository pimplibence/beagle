import { Base, BaseDocument } from '@kifly/boxer/src/document/base.document';
import { date } from '@kifly/boxer/src/document/decorators/date';
import { document } from '@kifly/boxer/src/document/decorators/document';

export interface Archive extends Base {
    deletedAt?: Date;
}

@document({
    indices: [
        { fieldOrSpec: { deletedAt: 1 } }
    ]
})
export class ArchiveDocument<T> extends BaseDocument<T & Archive> {
    @date()
    public deletedAt: Date;

    public archive(): Promise<ArchiveDocument<T>> {
        this.deletedAt = new Date();

        return this.save(false);
    }

    public restore(): Promise<ArchiveDocument<T>> {
        this.deletedAt = null;

        return this.save(false);
    }
}
