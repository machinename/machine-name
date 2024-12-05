enum ModelStatus {
    Deployed = 'Deployed',
    Inactive = 'Inactive',
    // add new statuses as needed
}

interface Metadata {
    createdAt: string;
    version: string;
    description: string;
    usageCount: number;
}

export class MLModel {
    private readonly id: string;
    private name: string;
    private status: ModelStatus;
    private metadata: Readonly<Metadata>;

    constructor(
        id: string,
        name: string,
        status: ModelStatus,
        metadata: Metadata
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.metadata = Object.freeze(metadata);
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(newName: string): void {
        if (newName.trim() === '') throw new Error('Name cannot be empty');
        this.name = newName;
    }

    getStatus(): ModelStatus {
        return this.status;
    }

    setStatus(newStatus: ModelStatus): void {
        if (!Object.values(ModelStatus).includes(newStatus)) {
            throw new Error('Invalid status value');
        }
        this.status = newStatus;
    }

    getMetadata(): Metadata {
        // Return a deep copy of metadata to ensure immutability
        return JSON.parse(JSON.stringify(this.metadata));
    }

    updateMetadata(newMetadata: Partial<Metadata>): void {
        // Perform a deep merge to avoid direct mutation
        this.metadata = Object.freeze({ ...this.metadata, ...newMetadata });
    }

    incrementUsageCount(): void {
        if (this.metadata.usageCount < Number.MAX_SAFE_INTEGER) {
            this.metadata = Object.freeze({
                ...this.metadata,
                usageCount: this.metadata.usageCount + 1,
            });
        } else {
            throw new Error('Usage count has reached its maximum value');
        }
    }

    toString(): string {
        return `
      Model ID: ${this.id}
      Name: ${this.name}
      Status: ${this.status}
      Created At: ${this.metadata.createdAt}
      Version: ${this.metadata.version}
      Description: ${this.metadata.description}
      Usage Count: ${this.metadata.usageCount}
    `;
    }
}

export default MLModel;
