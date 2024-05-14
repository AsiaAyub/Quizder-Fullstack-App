using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizderFullApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c3a2e99-637f-4970-9403-058cee98fc7e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "479519b8-447d-4ddd-abae-161012a7ee6e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3314d674-c09e-483a-8b19-e53ede459c26", null, "Admin", "ADMIN" },
                    { "d4028e4a-7de2-4d75-8da9-2e1a54ea319d", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3314d674-c09e-483a-8b19-e53ede459c26");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d4028e4a-7de2-4d75-8da9-2e1a54ea319d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1c3a2e99-637f-4970-9403-058cee98fc7e", null, "User", "USER" },
                    { "479519b8-447d-4ddd-abae-161012a7ee6e", null, "Admin", "ADMIN" }
                });
        }
    }
}
