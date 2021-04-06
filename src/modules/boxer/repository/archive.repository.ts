import { FindOneOptions } from '@kifly/boxer/src/collections/collection';
import { DefaultScope } from '@kifly/boxer/src/scope/default.scope';
import { ObjectId } from 'mongodb';
import { ArchiveDocument } from '../documents/archive.document';
import { Repository } from './repository';

export class ArchiveRepository<D extends ArchiveDocument<any>> extends Repository<D> {
    public async archive(id: string | ObjectId, options: FindOneOptions<D> = {}) {
        const item = await this.findById(id, options);

        item.deletedAt = new Date();

        return item.save(false);
    }

    public async restore(id: string | ObjectId, options: FindOneOptions<D> = {}) {
        options.scope = DefaultScope;

        const item = await this.findById(id, options);

        item.deletedAt = null;

        return item.save(false);
    }
}
