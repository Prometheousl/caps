import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";

// trying out pipes... this is a transformation pipe for titles of products
// making sure that they are capitalized

@Injectable()
export class CapitalizePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(metadata.data === 'title') {
            return this.capitalizeWords(value);
        }
    }
    // capitalize all first letters of each word in a string
    private capitalizeWords(value: string): string {
        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}