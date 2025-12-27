import { fetchAllContent } from "@/lib/api";
import { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
    title: "Campusify Blog | Data-Driven Education Stories",
    description: "Discover insights, tips, and strategies for data-driven decision making in education.",
};

export default async function Home() {
    const content = await fetchAllContent();
    return <BlogList initialPosts={content} />;
}
