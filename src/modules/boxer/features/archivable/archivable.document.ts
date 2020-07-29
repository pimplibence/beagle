import { Base, BaseDocument } from '@kifly/boxer/src/document/base.document';
import { date } from '@kifly/boxer/src/document/decorators/date';
import { document } from '@kifly/boxer/src/document/decorators/document';
import { utc } from 'moment';

export interface Archivable extends Base {
    deletedAt?: Date;
}

@document({
    indices: [
        { fieldOrSpec: { deletedAt: 1 } }
    ]
})
export class ArchivableDocument<T> extends BaseDocument<T & Archivable> {
    @date()
    public deletedAt: Date;

    public archive(): Promise<any> {
        this.deletedAt = utc().toDate();

        return this.save(false);
    }

    public unArchive(): Promise<any> {
        this.deletedAt = null;

        return this.save(false);
    }
}
