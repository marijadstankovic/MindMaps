using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MindMaps.Migrations
{
    public partial class InitialLocalDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 9, 21, 10, 22, 851, DateTimeKind.Local).AddTicks(8545));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 9, 21, 10, 22, 847, DateTimeKind.Local).AddTicks(6768));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 1, 17, 14, 57, 35, 143, DateTimeKind.Local).AddTicks(4850));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 1, 17, 14, 57, 35, 137, DateTimeKind.Local).AddTicks(9218));
        }
    }
}
